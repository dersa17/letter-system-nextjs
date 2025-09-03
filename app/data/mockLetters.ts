export const mockLetters = [
  {
    id: "LSB-2024-001",
    nrp: "2021041001",
    moNik: "MO-12345",
    kaprodiNik: "KP-67890",
    letterType: "Active Student Letter" as const,
    status: "approved" as const,
    submissionDate: "2024-01-15",
    approvalDate: "2024-01-18",
    letterFile: "active_student_letter_001.pdf",
    uploadDate: "2024-01-15",
    activeStudent: {
      fullName: "Alice Johnson",
      nrp: "2021041001",
      period: "2024/2025 Semester 1",
      address: "123 Academic Street, University City, UC 12345",
      submissionPurpose: "Required for scholarship application and bank account opening for academic purposes."
    }
  },
  {
    id: "GRC-2024-002",
    nrp: "2020031015",
    moNik: "MO-12346",
    kaprodiNik: "KP-67891",
    letterType: "Graduation Certificate" as const,
    status: "finished" as const,
    submissionDate: "2024-01-10",
    approvalDate: "2024-01-12",
    letterFile: "graduation_cert_002.pdf",
    uploadDate: "2024-01-10",
    graduationCertificate: {
      fullName: "Robert Smith",
      nrp: "2020031015",
      graduationDate: "2023-12-15"
    }
  },
  {
    id: "STR-2024-003",
    nrp: "2021052030",
    moNik: "MO-12347",
    kaprodiNik: "KP-67892",
    letterType: "Study Report" as const,
    status: "pending" as const,
    submissionDate: "2024-01-20",
    uploadDate: "2024-01-20",
    studyReport: {
      fullName: "Maria Garcia",
      nrp: "2021052030",
      creationPurpose: "Required for internship application at Tech Innovation Company for summer 2024 program."
    }
  },
  {
    id: "STM-2024-004",
    nrp: "2021043025",
    moNik: "MO-12348",
    kaprodiNik: "KP-67893",
    letterType: "SuratTugasMk" as const,
    status: "rejected" as const,
    submissionDate: "2024-01-18",
    uploadDate: "2024-01-18",
    suratTugasMk: {
      id: "STM-004",
      tujuanInstansi: "PT. Digital Solutions Indonesia",
      periode: "February 2024 - April 2024",
      dataMahasiswa: "David Chen - 2021043025 - Computer Science",
      tujuan: "To conduct research and practical learning in software development methodologies",
      topik: "Agile Development and DevOps Implementation in Enterprise Applications",
      matakuliah: "Software Engineering Project (CS-401)"
    }
  }
];