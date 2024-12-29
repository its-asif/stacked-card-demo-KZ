// const cardsContainer = document.querySelector('.cards');
// const cards = document.querySelectorAll('.card');
// cardsContainer.style.setProperty('--cards-count', cards.length);

// // Maximum height of cards
// const maxHeight = Math.max(...Array.from(cards).map(card => card.clientHeight));
// cardsContainer.style.setProperty('--card-height', `${maxHeight}px`);

// // Add more padding to the top
// Array.from(cards).forEach((card, index) => {
//   const offsetTop = 50 + index * 20; // Increased from 20 to 50
//   card.style.paddingTop = `${offsetTop}px`;
// });

// // Scroll event logic
// window.addEventListener('scroll', () => {
//   Array.from(cards).forEach((card, index) => {
//     const cardInner = card.querySelector('.card__inner');
//     const nextCard = cards[index + 1];
//     if (!nextCard) return; // Skip if it's the last card

//     const rect = nextCard.getBoundingClientRect();
//     const cardHeight = card.clientHeight;

//     // Calculate percentageY (0 at the top, 1 when fully inside viewport)
//     const percentageY = Math.min(Math.max((window.innerHeight - rect.top) / cardHeight, 0), 1);

//     // Calculate scale and brightness
//     const toScale = 1 - (cards.length - 1 - index) * 0.1;
//     const scale = 1 + (toScale - 1) * percentageY;
    

//     // Gradual brightness adjustment
//     const brightness = 1 - 0.2 * percentageY; // Reduced brightness change rate

//     // convert the brightness to the range of 0.6 to 1
//     // const brightness = 0.6 + 0.4 * (1 - percentageY);

//     // Apply transformations
//     cardInner.style.transform = `scale(${scale})`;
//     cardInner.style.filter = `brightness(${brightness})`;
//   });
// });


const { ScrollObserver, valueAtPercentage } = aat

const cardsContainer = document.querySelector('.cards')
const cards = document.querySelectorAll('.card')
cardsContainer.style.setProperty('--cards-count', cards.length)

// maximum height of cards
const maxHeight = Math.max(...Array.from(cards).map(card => card.clientHeight))

cardsContainer.style.setProperty(
  '--card-height',
  `${maxHeight}px`
)
Array.from(cards).forEach((card, index) => {
  const offsetTop = 20 + index * 20
  card.style.paddingTop = `${offsetTop}px`
  if (index === cards.length - 1) {
    return
  }
  const toScale = 1 - (cards.length - 1 - index) * 0.1
  const nextCard = cards[index + 1]
  const cardInner = card.querySelector('.card__inner')
  ScrollObserver.Element(nextCard, {
    offsetTop,
    offsetBottom: window.innerHeight - card.clientHeight
  }).onScroll(({ percentageY }) => {
    cardInner.style.scale = valueAtPercentage({
      from: 1,
      to: toScale,
      percentage: percentageY
    })
    cardInner.style.filter = `brightness(${valueAtPercentage({
      from: 1,
      to: 0.6,
      percentage: percentageY
    })})`
  })
})