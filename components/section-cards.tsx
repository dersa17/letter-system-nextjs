import { IconBook, IconSchool, IconUser, IconFileCheck, IconFileTime, IconFileX, IconFile, IconFileUpload, IconFileDownload } from "@tabler/icons-react"
import { getUserCount, getJurusanCount, getMataKuliahCount } from "@/lib/data"
import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import useDashboardStore from "@/app/stores/dashboard-store"



export function SectionCards({ type }: { type: string }) {
  const {dataDashboardAdmin, dataDashboardKaprodi, dataDashboardMO} = useDashboardStore()
  let card: { title: string; icon: React.ElementType; total: number }[] = []

  if (type === "admin") {
    card = [
      {
        title: "Course",
        icon: IconBook,
        total: dataDashboardAdmin?.amountOfCourse ?? 0,
    
      },
      {
        title: "Major",
        icon: IconSchool,
        total: dataDashboardAdmin?.amountOfMajor ?? 0,
    
      },
      {
        title: "User",
        icon: IconUser,
        total: dataDashboardAdmin?.amountOfUser ?? 0
    
      },
    ]
  } else if (type === "mo")  {
    card = [
      {
        title: "Letters",
        icon: IconFile,
        total: dataDashboardMO?.amountOfLetter ?? 0
    
      },
      {
        title: "Letters Ready to Upload ",
        icon: IconFileUpload,
        total: dataDashboardMO?.amountOfLetterReadyUpload ?? 0
    
      },
      {
        title: "Letters Uploaded",
        icon: IconFileDownload,
        total: dataDashboardMO?.amountOfUploaded ?? 0
    
      },
    ]
  } else if (type === "kaprodi" ) {
    card = [
      {
        title: "Letters Pending Approval",
        icon: IconFileTime,
        total: dataDashboardKaprodi?.amountOfLetterPending ?? 0,
      },
      {
        title: "Letters Approved",
        icon: IconFileCheck,
        total: dataDashboardKaprodi?.amountOfLetterApproved ?? 0,
      },
      {
        title: "Letters Rejected",
        icon: IconFileX,
        total: dataDashboardKaprodi?.amountOfLetterRejected ?? 0,
      },
    ]
  }
  return (
    <div className="*:data-[slot=card]:from-primary/5 *:data-[slot=card]:to-card dark:*:data-[slot=card]:bg-card grid grid-cols-1 gap-4 px-4 *:data-[slot=card]:bg-gradient-to-t *:data-[slot=card]:shadow-xs lg:px-6 @xl/main:grid-cols-3">
      {card.map((item, index) => (
        <Card key={index} className="@container/card">
          <CardHeader>
        <div className="flex space-x-2 text-muted-foreground justify-between">
          <CardDescription className="text-md">{item.title}</CardDescription>
          <item.icon />
        </div>
        <CardTitle className="text-2xl font-semibold tabular-nums @[250px]/card:text-3xl">
          {item.total}
        </CardTitle>
          </CardHeader>
        </Card>
      ))}
    </div>
  )
}
