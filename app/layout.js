export const metadata = {
    title: "ship",
    description: "boom",
};

export default function RootLayout({ children }) {
    return (
        <html lang="en">
            <body>{children}</body>
        </html>
    );
}
