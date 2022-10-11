import { Box, Heading, VStack, Flex, useBreakpointValue, useColorModeValue } from "@chakra-ui/react"
import { ReactElement, ReactNode } from "react"
import { Chrono } from "react-chrono"
import { TimelineMode } from "react-chrono/dist/models/TimelineModel"
import { timelineEvents } from "../../data/timeline"
import TimelineCard from "../timeline-card"

export default function Timeline() {
    const mode = useBreakpointValue<TimelineMode>({
        base: "VERTICAL",
        md: "HORIZONTAL"
    });
    return (
        <Flex w="full" direction="column" alignItems="center">
            <Heading size="md" py={4} w="100%" variant={"section-title"}>Journey</Heading>
            <Flex direction="column" w="90%" sx={{
                '.timeline-card': {
                    minHeight: "initial",
                    background: `${useColorModeValue('#fff', '#1d1d1d')} !important`
                },
                '.timeline-horz-card-wrapper': {
                    outline: "initial"
                },
                ".timeline-item-title.active": {
                    background: `${useColorModeValue("var(--chakra-colors-gray-100)", "var(--chakra-colors-gray-700)")
                        }`,
                    color: `${useColorModeValue("#3d7aed", "#ff63c3")}`
                },
                ".timeline-item-title": {
                    background: `${useColorModeValue("var(--chakra-colors-gray-100)", "var(--chakra-colors-gray-700)")
                        }`,
                    color: `${useColorModeValue("var(--chakra-colors-gray-700)", "var(--chakra-colors-gray-100)")
                        }`,
                    whiteSpace: "nowrap",
                    overflow: "hidden",
                    textOverflow: "ellipsis",
                },
                ".timeline-circle": {
                    background: `${useColorModeValue('#fff', '#1d1d1d')} !important`
                },
                ".timeline-content-card": {
                    borderColor: `${useColorModeValue('var(--chakra-colors-gray-200)', 'var(--chakra-colors-gray-700)')}`
                },
                ".active .timeline-content-card": {
                    borderColor: `${useColorModeValue("#3d7aed", "#ff63c3")}`
                },
                'div[class*="timelinestyle__Outline"]': {
                    background: `${useColorModeValue("#3d7aed", "#ff63c3")}`
                },
                ".using-icon": {
                    width: "24px",
                    height: "24px",
                    background: `${useColorModeValue('#fff', '#1d1d1d')} !important`

                },
                'span[class*="timeline-card-contentstyles__TriangleIconWrapper"]': {
                    display: "none"
                },
                ".timeline-vertical-circle::after": {
                    background: `${useColorModeValue("#3d7aed", "#ff63c3")}`
                }
            }
            }>
                <Chrono
                    borderLessCards
                    mode={
                        mode
                    }
                    showAllCardsHorizontal
                    hideControls
                    classNames={{
                        card: "timeline-card",
                    }}
                    items={timelineEvents.map((evt) => ({
                        title: evt.time,
                    }))}
                    fontSizes={{
                        cardSubtitle: '0.85rem',
                        cardText: '0.8rem',
                        cardTitle: '1rem',
                        title: '1rem',
                    }}
                >
                    {
                        timelineEvents.map((evt) =>
                            <TimelineCard
                                className="timeline-content-card"
                                key={evt.time}
                                title={evt.time}
                                imgUrl={evt.coverUrl}
                                description={evt.description}
                            />
                        ) as any
                    }

                    <div className="chrono-icons">
                        {
                            timelineEvents.map((evt) => <div className="chrono-icons" key={evt.time}>
                                {
                                    evt.icon
                                }
                            </div>)
                        }
                    </div>

                </Chrono>
            </Flex>

        </Flex >
    )
}
