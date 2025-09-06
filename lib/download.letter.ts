export const handleDownload = async (fileSuratUrl: string, fileName = "surat.pdf") => {
  if (!fileSuratUrl) return;

  const res = await fetch(fileSuratUrl);
  if (!res.ok) return console.log("Failed to download");

  const blob = await res.blob();
  const url = window.URL.createObjectURL(blob);

  const link = document.createElement("a");
  link.href = url;
  link.download = fileName;
  link.click();

  window.URL.revokeObjectURL(url);
};
