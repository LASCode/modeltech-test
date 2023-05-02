export interface NavbarProps {
    className?: string;
}

export interface NavbarItem {
    title: string;
    icon: string;
    position: 'bottom' | 'top';
    disabled?: boolean;
}