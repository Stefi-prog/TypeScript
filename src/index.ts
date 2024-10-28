console.log("Holis");

type Suit = "hearts" | "diamonds" | "clubs" | "spades" ;

interface Card {
  value: number;
  suit: Suit;
}

class Deck {
  private cards: Card[] = [];

  constructor() {
    const suits : Suit[] = ["hearts", "diamonds", "clubs", "spades"];
    const cards: Card[] = [] 
    suits.forEach((suit) => {
        for(let value = 1 ; value <= 13; value ++) {
            cards.push({value, suit });
        }

    })
   this.cards = cards 
   this.shuffle()
  }

  shuffle(): void {
    for(let i = this.cards.length - 1 ; i > 0; i-- ) {
        const randomCardPosition = Math.floor (Math.random() * (i + 1));
        const temp = this.cards[i];
        this.cards[i] = this.cards[randomCardPosition];
        this.cards[randomCardPosition] = temp;
    }
    
  }

  deal(numCards: number): Card[] {
    if (numCards> this.cards.length) {
        console.log("No hay suficientes cartas");
        return [];
    }
        
    
   return this.cards.splice(0, numCards)
  }
}

class CardGame {
  private deck: Deck;
  private players: Card[][];

  constructor(numPlayers: number, cardsPerPlayer: number = 5) {
    this.deck = new Deck();
    this.players = Array(numPlayers).fill([]);
    this.players = this.players.map((_player) =>{
        return this.deck.deal(2);
    })
        
    
  }


  showHands(): Card[][]{
    return this.players;
  }


  playRound(): string {
        let highestCard: Card | null = null;
        let winningPlayerIndex: number | null = null;
    
        this.players.forEach((playerHand, index) => {
          const playedCard = playerHand.shift(); // El jugador juega la primera carta de su mano
          if (!playedCard) return; // Si no hay carta, saltar
    
          console.log(`Jugador ${index + 1} juega ${playedCard.value} de ${playedCard.suit}`);
    
          if (!highestCard || playedCard.value > highestCard.value) {
            highestCard = playedCard;
            winningPlayerIndex = index;
          }
        });
    
        if (winningPlayerIndex !== null) {
          return `El jugador ${winningPlayerIndex + 1} gana la ronda con ${highestCard?.value} de ${highestCard?.suit}`;
        } else {
          return "No hay cartas para jugar.";
        }
      }
    }
  



const game = new CardGame(4);

console.log(game.showHands());

console.log(game.playRound());