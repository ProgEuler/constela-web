"use client"

import { useMemo, useRef, useCallback, useState, useEffect } from "react"
import { useTheme } from "next-themes"
import { AgGridProvider, AgGridReact } from "ag-grid-react"
import {
  AllCommunityModule,
  type CellClickedEvent,
  type ColDef,
  type GridOptions,
  type GridReadyEvent,
  type SelectionChangedEvent,
  type RowClickedEvent,
  type GridApi,
  type Theme,
} from "ag-grid-community"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Field, FieldContent, FieldLabel } from "@/components/ui/field"
import { Calendar } from "../ui/calendar"
import { format } from "date-fns"
import type { DateRange } from "react-day-picker"
import { createShadcnAgGridTheme } from "@/lib/ag-grid-shadcn-theme"
import { cn } from "@/lib/utils"

const modules = [AllCommunityModule]

type AgTableProps<TData extends object> = {
  rowData?: TData[] | null
  columnDefs: ColDef<TData>[]
  showRowNumberColumn?: boolean
  defaultColDef?: ColDef<TData>
  components?: GridOptions<TData>["components"]
  height?: number | string
  minHeight?: number | string
  pagination?: boolean
  pageSize?: number
  rowSelection?: GridOptions<TData>["rowSelection"]
  onSelectionChanged?: (selectedRows: TData[]) => void
  onRowClicked?: (row: TData) => void
  suppressCellClickAction?: boolean
  onCellValueChanged?: GridOptions<TData>["onCellValueChanged"]
  onGridReady?: (api: GridApi<TData>) => void
  gridOptions?: GridOptions<TData>
  loading?: boolean
  noRowsText?: string
  theme?: Theme
  className?: string
}

export function AgTable<TData extends object>({
  rowData,
  columnDefs,
  showRowNumberColumn = true,
  defaultColDef,
  components,
  height = "70vh",
  minHeight = 520,
  pagination = false,
  pageSize = 20,
  rowSelection,
  onSelectionChanged,
  onRowClicked,
  suppressCellClickAction = false,
  onCellValueChanged,
  onGridReady,
  gridOptions,
  loading = false,
  noRowsText = "No records found",
  theme,
  className,
}: AgTableProps<TData>) {
  const gridApiRef = useRef<GridApi<TData> | null>(null)
  const [isExportDialogOpen, setIsExportDialogOpen] = useState(false)
  const [dateField, setDateField] = useState("")
  const [dateRange, setDateRange] = useState<DateRange | undefined>()
  const [exportMessage, setExportMessage] = useState<string | null>(null)
  const [mounted, setMounted] = useState(false)
  const { resolvedTheme: colorScheme } = useTheme()

  useEffect(() => {
    setMounted(true)
  }, [])

  const gridTheme = useMemo(() => {
    if (theme) return theme
    if (!mounted) return createShadcnAgGridTheme()
    return createShadcnAgGridTheme()
  }, [theme, mounted, colorScheme])

  const hasExplicitNoColumn = useMemo(() => {
    const isNoHeader = (value: unknown) => {
      const text = typeof value === "string" ? value.trim().toLowerCase() : ""
      return text === "no" || text === "no." || text === "#"
    }

    return columnDefs.some((column) => {
      const field = typeof column.field === "string" ? column.field : ""
      const colId = typeof column.colId === "string" ? column.colId : ""
      const normalizedField = field.trim().toLowerCase()
      const normalizedColId = colId.trim().toLowerCase()

      return (
        normalizedField === "no" ||
        normalizedColId === "no" ||
        isNoHeader(column.headerName)
      )
    })
  }, [columnDefs])

  const rowNumberColumnDef = useMemo<ColDef<TData>>(
    () => ({
      headerName: "No.",
      colId: "__rowNumber",
      flex: 0,
      minWidth: 60,
      width: 60,
      maxWidth: 70,
      sortable: false,
      filter: false,
      resizable: false,
      suppressMovable: true,
      cellClass: "text-center",
      headerClass: "text-center",
      valueGetter: (params) => {
        const rowIndex = params.node?.rowIndex
        if (rowIndex === null || rowIndex === undefined) return ""
        return rowIndex + 1
      },
    }),
    []
  )

  const resolvedColumnDefs = useMemo(() => {
    if (!showRowNumberColumn || hasExplicitNoColumn) return columnDefs
    return [rowNumberColumnDef, ...columnDefs]
  }, [columnDefs, hasExplicitNoColumn, rowNumberColumnDef, showRowNumberColumn])

  const mergedDefaultColDef = useMemo<ColDef<TData>>(
    () => ({
      flex: 1,
      minWidth: 150,
      resizable: true,
      filter: true,
      sortable: true,
      wrapHeaderText: true,
      autoHeaderHeight: true,
      ...defaultColDef,
    }),
    [defaultColDef]
  )

  const exportableColumns = useMemo(
    () => columnDefs.filter((column) => Boolean(column.field) && !column.hide),
    [columnDefs]
  )

  const dateColumns = useMemo(
    () =>
      exportableColumns
        .map((column) => column.field)
        .filter(Boolean)
        .map((field) => String(field))
        .filter((field) => /date/i.test(field)),
    [exportableColumns]
  )

  const csvEscape = (value: unknown) => {
    const text = value === null || value === undefined ? "" : String(value)
    return `"${text.replaceAll('"', '""')}"`
  }

  const buildCsv = (rows: TData[]) => {
    const headers = exportableColumns.map((column) =>
      csvEscape(column.headerName || String(column.field || ""))
    )

    const body = rows.map((row) =>
      exportableColumns
        .map((column) => {
          const field = column.field
          if (!field) return csvEscape("")
          return csvEscape((row as Record<string, unknown>)[String(field)])
        })
        .join(",")
    )

    return [headers.join(","), ...body].join("\n")
  }

  const downloadCsv = (rows: TData[]) => {
    const blob = new Blob([buildCsv(rows)], { type: "text/csv;charset=utf-8;" })
    const url = URL.createObjectURL(blob)
    const anchor = document.createElement("a")
    const timestamp = new Date().toISOString().slice(0, 10)

    anchor.href = url
    anchor.download = `table-export-${timestamp}.csv`
    anchor.click()

    URL.revokeObjectURL(url)
  }

  const handleExport = () => {
    const rows = rowData ?? []
    let exportRows: TData[] = []

    if (!dateField) {
      setExportMessage("Choose a date field.")
      return
    }

    if (!dateRange?.from || !dateRange?.to) {
      setExportMessage("Choose a date range.")
      return
    }

    const startDate = new Date(dateRange.from)
    const endDate = new Date(dateRange.to)

    if (Number.isNaN(startDate.getTime()) || Number.isNaN(endDate.getTime())) {
      setExportMessage("Choose a valid date range.")
      return
    }

    const startTime = startDate.getTime()
    const endTime = endDate.getTime()
    const fieldName = dateField as string

    exportRows = rows.filter((row) => {
      const rawValue = (row as Record<string, unknown>)[fieldName]
      if (!rawValue) return false
      const valueDate = new Date(String(rawValue))
      const valueTime = valueDate.getTime()
      return (
        !Number.isNaN(valueTime) &&
        valueTime >= startTime &&
        valueTime <= endTime
      )
    })

    if (!exportRows.length) {
      setExportMessage("No rows matched the selected filter.")
      return
    }

    downloadCsv(exportRows)
    setExportMessage(
      `Exported ${exportRows.length} row${exportRows.length === 1 ? "" : "s"}.`
    )
    setIsExportDialogOpen(false)
  }

  const handleGridReady = useCallback(
    (event: GridReadyEvent<TData>) => {
      gridApiRef.current = event.api
      if (loading) event.api.showLoadingOverlay()
      onGridReady?.(event.api)
    },
    [loading, onGridReady]
  )

  const handleSelectionChanged = useCallback(
    (event: SelectionChangedEvent<TData>) => {
      if (!onSelectionChanged) return
      const selected = event.api.getSelectedRows()
      onSelectionChanged(selected)
    },
    [onSelectionChanged]
  )

  const handleRowClicked = useCallback(
    (event: RowClickedEvent<TData>) => {
      if (event.data) onRowClicked?.(event.data)
    },
    [onRowClicked]
  )

  const handleCellClicked = useCallback(
    (event: CellClickedEvent<TData>) => {
      if (suppressCellClickAction) return

      const target = event.event?.target
      if (target instanceof HTMLElement) {
        const interactiveElement = target.closest(
          "button, input, select, textarea, a, label, [role='switch'], [data-cell-click-ignore]"
        )

        if (interactiveElement) return
      }

      if (dateColumns.length > 0) {
        setDateField(String(dateColumns[0]))
      }

      setExportMessage(null)
      setDateRange(undefined)
      setIsExportDialogOpen(true)
    },
    [dateColumns, suppressCellClickAction]
  )

  const isAutoHeight = height === "auto"
  const containerStyle = isAutoHeight
    ? { width: "100%" }
    : {
        width: "100%",
        height: typeof height === "number" ? `${height}px` : height,
        minHeight: typeof minHeight === "number" ? `${minHeight}px` : minHeight,
      }

  return (
    <AgGridProvider modules={modules}>
      <div className={cn("ag-table-shadcn w-full", className)} style={containerStyle}>
        <AgGridReact<TData>
          rowData={rowData}
          columnDefs={resolvedColumnDefs}
          defaultColDef={mergedDefaultColDef}
          theme={gridTheme}
          domLayout={isAutoHeight ? "autoHeight" : "normal"}
          components={components}
          rowSelection={rowSelection}
          onSelectionChanged={handleSelectionChanged}
          onGridReady={handleGridReady}
          onRowClicked={handleRowClicked}
          onCellClicked={handleCellClicked}
          onCellValueChanged={onCellValueChanged}
          pagination={pagination}
          paginationPageSize={pageSize}
          paginationPageSizeSelector={[10, 20, 50, 100]}
          animateRows
          suppressMovableColumns={false}
          enableCellTextSelection
          noRowsOverlayComponent={() => (
            <span className="text-sm text-muted-foreground">{noRowsText}</span>
          )}
          {...gridOptions}
        />
      </div>

      <Dialog open={isExportDialogOpen} onOpenChange={setIsExportDialogOpen}>
        <DialogContent className="sm:max-w-[480px]">
          <DialogHeader>
            <DialogTitle>Export table data</DialogTitle>
            <DialogDescription>
              Choose a date field and date range, then download the matching
              rows as CSV.
            </DialogDescription>
          </DialogHeader>

          <div className="grid gap-4 py-2">
            <div className="grid gap-3">
              <Field>
                <FieldLabel>Date field</FieldLabel>
                <FieldContent>
                  <Select value={dateField} onValueChange={setDateField}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select date field" />
                    </SelectTrigger>
                    <SelectContent>
                      {dateColumns.length > 0 ? (
                        dateColumns.map((field) => (
                          <SelectItem key={String(field)} value={String(field)}>
                            {String(field)}
                          </SelectItem>
                        ))
                      ) : (
                        <SelectItem value="__none__" disabled>
                          No date columns available
                        </SelectItem>
                      )}
                    </SelectContent>
                  </Select>
                </FieldContent>
              </Field>

              <Field>
                <FieldLabel>Date range</FieldLabel>
                <FieldContent>
                  <div className="rounded-lg border border-input bg-input/30 p-2">
                    <Calendar
                      mode="range"
                      selected={dateRange}
                      onSelect={setDateRange}
                      numberOfMonths={2}
                      captionLayout="dropdown"
                    />
                  </div>

                  {dateRange?.from || dateRange?.to ? (
                    <p className="mt-2 text-xs text-muted-foreground">
                      {dateRange.from
                        ? `From ${format(dateRange.from, "yyyy-MM-dd")}`
                        : "From not selected"}{" "}
                      {dateRange.to
                        ? `to ${format(dateRange.to, "yyyy-MM-dd")}`
                        : "to not selected"}
                    </p>
                  ) : null}
                </FieldContent>
              </Field>
            </div>

            {exportMessage ? (
              <p className="text-xs text-muted-foreground">{exportMessage}</p>
            ) : null}
          </div>

          <DialogFooter>
            <Button
              variant="outline"
              type="button"
              onClick={() => setIsExportDialogOpen(false)}
            >
              Cancel
            </Button>
            <Button type="button" onClick={handleExport}>
              Export CSV
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </AgGridProvider>
  )
}
