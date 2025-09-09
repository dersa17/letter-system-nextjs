"use client"

import { Pie, PieChart } from "recharts"
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
  ChartLegend,
  ChartLegendContent,
} from "@/components/ui/chart"
import useDashboardStore from "@/app/stores/dashboard-store"

export const description = "A pie chart with a label list"

const chartConfig = {
  visitors: { label: "Amount" },
  chrome: { label: "Tugas Mata Kuliah", color: "var(--chart-1)" },
  safari: { label: "Laporan Hasil Studi", color: "var(--chart-2)" },
  firefox: { label: "Keterangan Lulus", color: "var(--chart-3)" },
  other: { label: "Mahasiswa Aktif", color: "var(--chart-5)" },
} satisfies ChartConfig

export function ChartPieLabelList() {
  const { dataDashboardKaprodi, dataDashboardMO } = useDashboardStore()

  const data = dataDashboardKaprodi ?? dataDashboardMO

  // ✅ tambahkan field "key" agar tiap item unik
  const chartData = [
    {
      key: "chrome",
      browser: "chrome",
      visitors: data?.amountOfTugasMataKuliah ?? 0,
      fill: "var(--color-chrome)",
    },
    {
      key: "safari",
      browser: "safari",
      visitors: data?.amountOfLaporanHasilStudi ?? 0,
      fill: "var(--color-safari)",
    },
    {
      key: "firefox",
      browser: "firefox",
      visitors: data?.amountOfKeteranganLulus ?? 0,
      fill: "var(--color-firefox)",
    },
    {
      key: "other",
      browser: "other",
      visitors: data?.amountOfMahasiswaAktif ?? 0,
      fill: "var(--color-other)",
    },
  ]

  return (
    <Card className="flex flex-col">
      <CardHeader className="items-center pb-0">
        <CardTitle>Number of submissions per letter type</CardTitle>
      </CardHeader>
      <CardContent className="flex-1 pb-0">
        <ChartContainer
          config={chartConfig}
          className="[&_.recharts-text]:fill-background mx-auto aspect-square"
        >
          <PieChart>
            <ChartTooltip
              content={<ChartTooltipContent nameKey="visitors" hideLabel />}
            />
            {/* ✅ tambahkan nameKey supaya legend bisa pakai "browser" */}
            <Pie data={chartData} dataKey="visitors" nameKey="browser" />
            <ChartLegend
              content={<ChartLegendContent nameKey="browser" />}
              className="-translate-y-2 flex-wrap gap-2 *:basis-1/4 *:justify-center"
            />
          </PieChart>
        </ChartContainer>
      </CardContent>
    </Card>
  )
}
