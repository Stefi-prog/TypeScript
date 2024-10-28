function _define_property(obj, key, value) {
    if (key in obj) {
        Object.defineProperty(obj, key, {
            value: value,
            enumerable: true,
            configurable: true,
            writable: true
        });
    } else {
        obj[key] = value;
    }
    return obj;
}
console.log("Holis");
class Deck {
    shuffle() {
        for(let i = this.cards.length - 1; i > 0; i--){
            const randomCardPosition = Math.floor(Math.random() * (i + 1));
            const temp = this.cards[i];
            this.cards[i] = this.cards[randomCardPosition];
            this.cards[randomCardPosition] = temp;
        }
    }
    deal(numCards) {
        if (numCards > this.cards.length) {
            console.log("No hay suficientes cartas");
            return [];
        }
        return this.cards.splice(0, numCards);
    }
    constructor(){
        _define_property(this, "cards", []);
        const suits = [
            "hearts",
            "diamonds",
            "clubs",
            "spades"
        ];
        const cards = [];
        suits.forEach((suit)=>{
            for(let value = 1; value <= 13; value++){
                cards.push({
                    value,
                    suit
                });
            }
        });
        this.cards = cards;
        this.shuffle();
    }
}
class CardGame {
    showHands() {
        return this.players;
    }
    playRound() {
        let highestCard = null;
        let winningPlayerIndex = null;
        this.players.forEach((playerHand, index)=>{
            const playedCard = playerHand.shift(); // El jugador juega la primera carta de su mano
            if (!playedCard) return; // Si no hay carta, saltar
            console.log(`Jugador ${index + 1} juega ${playedCard.value} de ${playedCard.suit}`);
            if (!highestCard || playedCard.value > highestCard.value) {
                highestCard = playedCard;
                winningPlayerIndex = index;
            }
        });
        if (winningPlayerIndex !== null) {
            return `El jugador ${winningPlayerIndex + 1} gana la ronda con ${highestCard === null || highestCard === void 0 ? void 0 : highestCard.value} de ${highestCard === null || highestCard === void 0 ? void 0 : highestCard.suit}`;
        } else {
            return "No hay cartas para jugar.";
        }
    }
    constructor(numPlayers, cardsPerPlayer = 5){
        _define_property(this, "deck", void 0);
        _define_property(this, "players", void 0);
        this.deck = new Deck();
        this.players = Array(numPlayers).fill([]);
        this.players = this.players.map((_player)=>{
            return this.deck.deal(2);
        });
    }
}
const game = new CardGame(4);
console.log(game.showHands());
console.log(game.playRound());
