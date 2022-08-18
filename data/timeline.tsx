import { Icon } from "@chakra-ui/react";
import { ReactNode } from "react";
import { GiNewBorn } from "react-icons/gi"
import { FaUniversity } from "react-icons/fa"
export type TimelineEvent = {
    time: string,
    description: string,
    coverUrl: string,
    icon?: ReactNode,
}

export const timelineEvents: Array<TimelineEvent> = [
    {
        time: "Nov 1996",
        description: "🍼 Born in the province of Jiangxi, China.",
        coverUrl: "/images/profile.png",
        icon: <Icon as={GiNewBorn}></Icon>
    },
    {
        time: "Sep 2012",
        description: "🎟️ Enter Beijing Institue of Technology for my bachelor's degree. Major in Electronic Engineering.",
        coverUrl: "/images/profile.png",
        icon: <Icon as={FaUniversity}></Icon>
    },
    {
        time: "Sep 2016",
        description: "Enter University of California, San Diego for my master's degres. Major in Intelligent Systems, Robtics & Control.",
        coverUrl: "/images/profile.png",
        icon: <Icon as={FaUniversity}></Icon>
    },
    {
        time: "Sep 2018",
        description: "Join MicroStrategy as a Frontend software engineer. Focus on data visualiztion",
        coverUrl: "/images/profile.png",
        icon: <Icon as={FaUniversity}></Icon>
    },
    {
        time: "Mar 2020",
        description: "Join Microsoft as a Full-stack software engineer. Developing web applications and web services.",
        coverUrl: "/images/profile.png",
        icon: <Icon as={FaUniversity}></Icon>
    }
]