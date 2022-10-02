import Link from "next/link";

function JoinPage(): JSX.Element {
    return (
        <div>
            <Link href="/user">
                회원 정보
            </Link>
            <button>
                google
            </button>
            <button>
                facebook
            </button>
        </div>
    )
}

export default JoinPage;