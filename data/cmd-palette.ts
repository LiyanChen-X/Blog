import { IconType } from 'react-icons/lib';
import {
    SiTwitter,
    SiGithub,
    SiYoutube,
    SiPolywork,
    SiTwitch,
} from 'react-icons/si';
import { IoMoon } from 'react-icons/io5';


type BaseItem = {
    title: string;
};

export type PageItem = BaseItem & {
    href: string;
};

export type SocialItem = BaseItem & {
    href: string;
    icon: IconType;
};

export type ThemeItem = BaseItem & {
    id: 'theme';
    icon: IconType;
};

export type SearchItemsType = {
    pages: PageItem[];
    social: SocialItem[];
    theme: ThemeItem[];
};

export const searchItems: SearchItemsType = {
    pages: [
        {
            title: 'Home',
            href: '/',
        },
        {
            title: 'Blog',
            href: '/blogs',
        },
        {
            title: 'Analytics',
            href: "/analytics",
        },
        {
            title: 'Bookmarks',
            href: '/bookmarks',
        }, {
            title: "Playground",
            href: '/playground',
        }
    ],
    theme: [
        {
            id: 'theme',
            title: 'Change theme',
            icon: IoMoon,
        },
    ],
    social: [

    ]
};
