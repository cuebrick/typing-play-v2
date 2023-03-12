export interface IUserData {
  uid: string | null; // 사용자 uid (이메일과 다르며 노출하지 않음)
  name: string | null; // 사용자 이름(닉네임)
  grade: 'admin' | 'moderator' | 'normal' | null; // 사용자 등급
  groupId: string | null; // 현재 진행중인 groupId
  levelId: string | null; // 마지막으로 실행 했던 levelId
}
