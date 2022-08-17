import { Box } from "@chakra-ui/react"
import { Chrono } from "react-chrono"
import { timelineEvents } from "../../data/timeline"
import TimelineCard from "../timeline-card"

export default function Timeline() {
    return (
        <Box w="full">
            <Chrono
                borderLessCards
                mode="HORIZONTAL"
                showAllCardsHorizontal
                hideControls
                classNames={{
                    card: "timeline-card-specific",

                }}
                items={timelineEvents.map((evt) => ({
                    title: evt.time,
                }))}
            >
                {
                    timelineEvents.map((evt) =>
                        <TimelineCard
                            key={evt.time}
                            title={evt.time}
                            imgUrl={evt.coverUrl}
                            description={evt.description}
                        />
                    )
                }
            </Chrono>
        </Box >
    )
}