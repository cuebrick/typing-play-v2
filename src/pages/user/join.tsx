import Link from 'next/link';

function UserJoinPage(): JSX.Element {
  return (
    <div>
      <div>
        user name
        <input type="text" placeholder="User Name" />
        user email
        <input type="text" placeholder="User Id" />
        password
        <input type="password" placeholder="password" />
      </div>
      <Link href="/user">회원 정보</Link>
      <button>google</button>
      <button>facebook</button>
      <button>naver</button>
    </div>
  );
}

export default UserJoinPage;
