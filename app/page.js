import Link from "next/link";

export default function Home() {
    return (
        <div>
            <h1>welcome to ship</h1>
            <p>choose your gameplay</p>
            <div>
                <Link href="/play?adjacent=false">smart ai + adjacent ships not allowed (recommended)</Link>
            </div>
            <div>
                <Link href="/play">smart ai + adjacent ships allowed</Link>
            </div>
            <div>
                <Link href="/play?smart=false">random ai + adjacent ships allowed</Link>
            </div>
            <div>
                <Link href="/play?smart=false&adjacent=false">random ai + adjacent ships not allowed</Link>
            </div>
        </div>
    );
}
