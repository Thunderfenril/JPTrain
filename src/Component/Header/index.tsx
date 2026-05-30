
import HeaderComponent from '@components/HeaderComponent'

export default function Header() {
    const titles = [
        {
            title: 'Acceuil',
            path: '/JPTrain/home'
        },
        {
            title: 'Profil',
            path: '/JPTrain/profil'
        }
    ]

    return (
        <div>
            {titles.map((title, index) => (
                <HeaderComponent
                    key={'headerComponent_' + index}
                    title={title.title}
                    path={title.path}
                    />
            ))}
        </div>
    )
}