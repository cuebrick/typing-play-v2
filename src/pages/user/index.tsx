import Link from 'next/link';

function UserIndexPage(): JSX.Element {
    return (
        <div>
            <div>
                user id
                <input type="text" placeholder="User Id"/>
                password
                <input type="password" placeholder="password"/>
            </div>
            <Link href="/user/join">
                회원가입
            </Link>
            <Link href="/levels">
                레벨 목록
            </Link>
        </div>
    );
}

export default UserIndexPage;