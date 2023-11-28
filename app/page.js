import Link from "next/link";

export default function Home() {
    return (
        <div>
            <h1>welcome to ship</h1>
            <div>
                <Link href="/play">play against smart ai</Link>
            </div>
            <div>
                <Link href="/play?smart=false">play against random ai</Link>
            </div>
        </div>
    );
}
