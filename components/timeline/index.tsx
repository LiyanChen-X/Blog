import { Box, Heading, VStack, Flex, useBreakpointValue } from "@chakra-ui/react"
import { ReactElement, ReactNode } from "react"
import { Chrono } from "react-chrono"
import { TimelineMode } from "react-chrono/dist/models/TimelineModel"
import { timelineEvents } from "../../data/timeline"
import TimelineCard from "../timeline-card"

export default function Timeline() {
    const mode = useBreakpointValue<TimelineMode>({
        base: "VERTICAL",
        md: "HORIZONTAL"
    })
    return (
        <Flex w="full" direction="column" alignItems="center">
            <Heading size="md" py={4} w="100%">Journey</Heading>
            <Flex direction="column" w="90%" sx={{
                '.timeline-card': {
                    minHeight: "initial"
                },
                '.timeline-horz-card-wrapper': {
                    outline: "initial"
                },
                ".timeline-item-title.active": {
                    background: "var(--chakra-colors-gray-100)"
                },
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
                    theme={{
                        titleColor: "var(--chakra-colors-gray-700)",
                        titleColorActive: "var(--chakra-colors-gray-700)",
                    }}
                >
                    {
                        timelineEvents.map((evt) =>
                            <TimelineCard
                                className="timeline-card-content"
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