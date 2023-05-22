import { animate, state, style, transition, trigger } from "@angular/animations";

export const rotateTrigger = trigger("rotate", [
    state("void", style({
        opacity: 0,
        scale: 0,
        transform: "rotate(360deg"
    })),
    transition(":enter, :leave", [
        animate(".25s ease-in-out")
    ])
]);