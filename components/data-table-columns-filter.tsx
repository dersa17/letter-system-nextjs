import * as React from "react";
import { Column, Table } from "@tanstack/react-table";
import { 
  IconFilter, 
  IconX,
  IconCalendar 
} from "@tabler/icons-react";
import { format } from "date-fns";
import { DateRange } from "react-day-picker";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Calendar } from "@/components/ui/calendar";
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
  DropdownMenuLabel,
} from "@/components/ui/dropdown-menu";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

// Select Filter Component
interface DataTableColumnFilterProps<TData> {
  column: Column<TData>;
  title: string;
  options: { label: string; value: string }[];
}

export function DataTableColumnFilter<TData>({
  column,
  title,
  options,
}: DataTableColumnFilterProps<TData>) {
  const facetedUniqueValues = column.getFacetedUniqueValues();
  const selectedValues = new Set(column.getFilterValue() as string[]);

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline" size="sm">
          <IconFilter className="h-4 w-4" />
          {title}
          {selectedValues?.size > 0 && (
            <div className="ml-2 rounded bg-primary px-1 py-0.5 text-xs text-primary-foreground">
              {selectedValues.size}
            </div>
          )}
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-56" align="start">
        <DropdownMenuLabel>{title}</DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuItem
          onSelect={() => column.setFilterValue(undefined)}
        >
          Clear Filter
        </DropdownMenuItem>
        <DropdownMenuSeparator />
        {options.map((option) => {
          const isSelected = selectedValues.has(option.value);
          return (
            <DropdownMenuCheckboxItem
              key={option.value}
              className="capitalize"
              checked={isSelected}
              onCheckedChange={(value) => {
                if (value) {
                  selectedValues.add(option.value);
                } else {
                  selectedValues.delete(option.value);
                }
                const filterValues = Array.from(selectedValues);
                column.setFilterValue(
                  filterValues.length ? filterValues : undefined
                );
              }}
            >
              <div className="flex items-center justify-between w-full">
                <span>{option.label}</span>
                <span className="text-xs text-muted-foreground">
                  {facetedUniqueValues?.get(option.value) || 0}
                </span>
              </div>
            </DropdownMenuCheckboxItem>
          );
        })}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

// Date Range Filter Component
interface DateRangeFilterProps<TData> {
  column: Column<TData>;
  title: string;
}

export function DateRangeFilter<TData>({
  column,
  title,
}: DateRangeFilterProps<TData>) {
  const [date, setDate] = React.useState<DateRange | undefined>(
    column.getFilterValue() as DateRange
  );

  const handleDateSelect = (selectedDate: DateRange | undefined) => {
    setDate(selectedDate);
    column.setFilterValue(selectedDate);
  };

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          size="sm"
          className={cn(
            "justify-start text-left font-normal",
            !date && "text-muted-foreground"
          )}
        >
          <IconCalendar className="mr-2 h-4 w-4" />
          {date?.from ? (
            date.to ? (
              <>
                {format(date.from, "MMM dd")} - {format(date.to, "MMM dd, yyyy")}
              </>
            ) : (
              format(date.from, "MMM dd, yyyy")
            )
          ) : (
            <span>{title}</span>
          )}
          {date && (
            <IconX
              className="ml-2 h-4 w-4 hover:text-destructive"
              onClick={(e) => {
                e.stopPropagation();
                handleDateSelect(undefined);
              }}
            />
          )}
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-auto p-0" align="start">
        <Calendar
          initialFocus
          mode="range"
          defaultMonth={date?.from}
          selected={date}
          onSelect={handleDateSelect}
          numberOfMonths={2}
        />
        <div className="p-3 border-t">
          <Button
            variant="outline"
            size="sm"
            onClick={() => handleDateSelect(undefined)}
            className="w-full"
          >
            Clear Filter
          </Button>
        </div>
      </PopoverContent>
    </Popover>
  );
}

// Text Filter Component
interface TextFilterProps<TData> {
  column: Column<TData>;
  title: string;
  placeholder?: string;
}

export function TextFilter<TData>({
  column,
  title,
  placeholder,
}: TextFilterProps<TData>) {
  return (
    <div className="flex items-center space-x-2">
      <Input
        placeholder={placeholder || `Filter ${title.toLowerCase()}...`}
        value={(column.getFilterValue() as string) ?? ""}
        onChange={(event) =>
          column.setFilterValue(event.target.value || undefined)
        }
        className="h-8 w-40"
      />
    </div>
  );
}

// Filter Interface Types
export interface SelectFilterConfig {
  type: 'select';
  column: string;
  title: string;
  options: { label: string; value: string }[];
}

export interface DateRangeFilterConfig {
  type: 'dateRange';
  column: string;
  title: string;
}

export interface TextFilterConfig {
  type: 'text';
  column: string;
  title: string;
  placeholder?: string;
}

export type FilterConfig = SelectFilterConfig | DateRangeFilterConfig | TextFilterConfig;

// Main Filter Component that handles all filter types
interface DataTableFilterProps<TData> {
  filter: FilterConfig;
  table: Table<TData>;
}

export function DataTableFilter<TData>({
  filter,
  table,
}: DataTableFilterProps<TData>) {
  const column = table.getColumn(filter.column);
  if (!column) return null;

  switch (filter.type) {
    case 'select':
      return (
        <DataTableColumnFilter
          column={column}
          title={filter.title}
          options={filter.options}
        />
      );
    
    case 'dateRange':
      return (
        <DateRangeFilter
          column={column}
          title={filter.title}
        />
      );
    
    case 'text':
      return (
        <TextFilter
          column={column}
          title={filter.title}
          placeholder={filter.placeholder}
        />
      );
    
    default:
      return null;
  }
}

// Custom filter functions
export const dateRangeFilterFn = (row: any, columnId: string, value: DateRange) => {
  const date = new Date(row.getValue(columnId));
  const { from, to } = value;
  
  if (!from) return true;
  if (from && !to) {
    return date >= from;
  }
  if (from && to) {
    return date >= from && date <= to;
  }
  
  return true;
};

// Multi-select filter function
export const multiSelectFilterFn = (row: any, columnId: string, value: string[]) => {
  if (!value || value.length === 0) return true;
  const cellValue = row.getValue(columnId);
  return value.includes(cellValue);
};