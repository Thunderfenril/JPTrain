import { useLocation, useNavigate } from 'react-router-dom'

interface IHeaderComponent {
    title: string
    path: string
}

export default function HeaderComponent({
    title,
    path
} : IHeaderComponent) {
 
    const nav = useNavigate();
    const location = useLocation();

    function isSelected(path: string) {
        return location.pathname.includes(path.split('/')[2]) ? 'selected' : ''
    }

    return (
        <div
            className={'heaedr_item' + isSelected(path)}
            onClick={() => nav(path)}
        >
            {title}
        </div>
    )

}