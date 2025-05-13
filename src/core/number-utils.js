export class NumberUtils {
    /**
     *
     * @param {*} max
     * @returns вернет рандомное число от 1 до max
     */
    static getRandomNumber(max) {
        return Math.floor(Math.random() * max)
    }
}