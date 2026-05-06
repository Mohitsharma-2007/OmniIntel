export const downloadReport = (title: string, data: any) => {
    if (!data) return;

    let content = `OMNIINTEL INTELLIGENCE REPORT\n`;
    content += `===============================\n\n`;
    content += `TITLE: ${title}\n`;
    content += `SUBTITLE: ${data.subtitle}\n`;
    content += `DATE: ${data.date}\n`;
    content += `AUTHOR: ${data.author}\n\n`;
    content += `SUMMARY:\n${data.summary}\n\n`;

    data.sections?.forEach((section: any) => {
        content += `SECTION: ${section.title}\n`;
        content += `-------------------\n`;
        content += `${section.content}\n\n`;

        section.tables?.forEach((table: any) => {
            content += `TABLE: ${table.caption}\n`;
            content += `${table.headers.join(" | ")}\n`;
            table.rows.forEach((row: any) => {
                content += `${row.join(" | ")}\n`;
            });
            content += `\n`;
        });
    });

    const blob = new Blob([content], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `${title.replace(/\s+/g, '_')}_Report.txt`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
};
