import styles from 'assets/styles/index-page.module.scss'

function IndexPage(): JSX.Element {
    return (
        <div>
            <div className={styles.container}>
                <p>
                    아래 과정 중 하나를 선택하세요.
                </p>
                <button>
                    사용자 등록
                </button>
            </div>
        </div>
    )
}

export default IndexPage
