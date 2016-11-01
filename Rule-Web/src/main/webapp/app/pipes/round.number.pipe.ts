import {Pipe} from "angular2/core";

@Pipe({
    name: "roundNum"
})

export class RoundNumber {
    transform(value) {
        return numeral(value).format('0.00a');
    }
}