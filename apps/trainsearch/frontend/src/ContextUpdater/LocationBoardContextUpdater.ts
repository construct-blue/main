import {ClientInterface} from "../Client/ClientInterface";
import {LocationBoardContext} from "../Context/LocationBoardContext";

export class LocationBoardContextUpdater {
    constructor(private client: ClientInterface) {
    }

    async update(context: LocationBoardContext): Promise<LocationBoardContext> {
        const updatedContext = new LocationBoardContext(
                context.profile,
                context.location,
                await this.client.departures(context.profile, context.location)
        )

        if (context.selectedTrip) {
            updatedContext.selectTrip(await this.client.trip(context.profile, context.selectedTrip.id))
        }
        return updatedContext;
    }
}