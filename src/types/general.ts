export interface IGame {
    objects: any[];
    canvas: HTMLCanvasElement;
    ctx: CanvasRenderingContext2D;
    width: number;
    height: number;
    start: boolean;
    mouse: { x: number; y: number; down: boolean };
    end: boolean;
    hero?: IHero;
    init(hero: string): void;
    draw(): void;
}

export interface IHero {
    curHp: number;
    init(hero: string): void;
    draw(): void;
}
