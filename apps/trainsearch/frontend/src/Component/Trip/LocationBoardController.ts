import {ReactiveController, ReactiveControllerHost} from "lit";
import {LocationBoardContext} from "../../Context/LocationBoardContext";
import {Stop} from "../../Models/Stop";
import {LocationBoardContextUpdater} from "../../ContextUpdater/LocationBoardContextUpdater";
import {ClientInterface} from "../../Client/ClientInterface";
import {Trip} from "../../Models/Trip";
import {TripEvent} from "./TripList";
import {favoritesState} from "../../Favorites/FavoritesState";
import {StateController} from "@lit-app/state/src/state-controller.js";

export class LocationBoardController implements ReactiveController {
    private boardContext!: LocationBoardContext;
    private boardContextUpdater: LocationBoardContextUpdater
    public loading: boolean = false

    constructor(private host: ReactiveControllerHost, private client: ClientInterface, profile: string, location: Stop) {
        host.addController(this)
       // new StateController(host, favoritesState)
        this.boardContextUpdater = new LocationBoardContextUpdater(client)
        this.boardContext = new LocationBoardContext(profile, location, [])
        this.updateBoard()
    }

    public async updateBoard() {
        this.boardContext = await this.boardContextUpdater.update(this.boardContext)
        this.loading = false
        this.host.requestUpdate()
    }

    hostDisconnected() {
        this.client.abort()
    }

    get departures(): Trip[] {
        return this.boardContext.departures
    }

    public onSelect(event: TripEvent) {
        this.boardContext.selectTrip(event.trip)
        this.host.requestUpdate()
        this.updateBoard()
    }

    public onRefresh() {
        this.loading = true
        this.host.requestUpdate()
        this.updateBoard()
    }

    public onBack() {
        this.boardContext.selectTrip(null)
        this.host.requestUpdate()
        this.updateBoard()
    }

    public onFavorite() {
        if (this.selectedTrip) {
           // favoritesState.addTrip(this.selectedTrip)
        } else {
           // favoritesState.addStop(this.boardContext.stop)
        }
    }

    public isFavorite(): boolean {
        if (this.selectedTrip) {
            return favoritesState.hasTrip(this.selectedTrip)
        } else {
            return favoritesState.hasStop(this.boardContext.stop)
        }
    }

    get selectedTrip() {
        return this.boardContext.selectedTrip
    }
}