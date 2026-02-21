
const OPERATORS = {
    easy: ['+', '-', '×'],
    medium: ['+', '-', '×'],
    hard: ['+', '-', '×', '÷'],
};

function testLevel(difficulty) {
    const ops = OPERATORS[difficulty] || ['+'];
    const counts = {};
    for (let i = 0; i < 100; i++) {
        const op = ops[Math.floor(Math.random() * ops.length)];
        counts[op] = (counts[op] || 0) + 1;
    }
    console.log(`Difficulty: ${difficulty}`);
    console.log(counts);
}

testLevel('easy');
testLevel('medium');
testLevel('hard');
