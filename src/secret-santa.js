const people = ["person1", "person2", "person3", "persno4"];

function shuffle(a) {
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

function solution(people) {
  const randomizeArray = shuffle([...people]);

  const solArray = [];

  for (let ind = 0; ind < people.length; ind++) {
    if (people[ind] !== randomizeArray[0]) {
      solArray.push([people[ind], randomizeArray[0]]);
      randomizeArray.shift();
    } else {
      solArray.push([people[ind], randomizeArray[randomizeArray.length - 1]]);
      randomizeArray.pop();
    }
  }
  return solArray;
}

console.log(solution(people));

////searchTree

const tree = {
  value: 5,
  left: { value: 3, left: null, right: null },
  right: { value: 8, right: null, left: null }
};
