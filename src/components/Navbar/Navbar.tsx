import cnBind from 'classnames/bind';
import styles from './Navbar.module.scss';
import {NavbarItem, NavbarProps} from "./Navbar.types";
import {useIsMobile} from "hooks/useIsMobile";
import {useMemo} from "react";
import {NavLink} from "react-router-dom";
import {appRoutes} from "../../routes";
const cx = cnBind.bind(styles);

export const Navbar = ({ className }: NavbarProps) => {
    const isMobile = useIsMobile();

    const items: NavbarItem[] = useMemo(() => [
        {
            title: 'Месторождения',
            icon: 'pi pi-globe',
            position: 'top',
        },
        // {
        //     title: 'Настройки',
        //     icon: 'pi pi-cog',
        //     position: 'bottom',
        //     disabled: true,
        // },
        // {
        //     title: 'Мой аккаунт',
        //     icon: 'pi pi-user',
        //     position: 'bottom',
        //     disabled: true,
        // }
    ], [])

    return (
        <header className={cx('navbar', className)}>
            <div>
                {items.map((el) => (
                    <NavLink className={cx('link')} to={appRoutes.index()}>
                        <span className={el.icon} />
                        <span>{el.title}</span>
                    </NavLink>
                ))}
            </div>
        </header>
    );
};