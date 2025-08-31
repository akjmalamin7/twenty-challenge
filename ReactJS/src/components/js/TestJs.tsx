const TestJs = () => {
  // const arr: number[] = [1, 2, 3, 4, 5];
  // const arr2 = [
  //   { id: 1, name: "John", age: 25 },
  //   { id: 2, name: "Jane", age: 30 },
  //   { id: 3, name: "Jim", age: 28 },
  //   { id: 4, name: "Sadik", age: 28 },
  // ]
  // const nums = [1, 2, 2, 3, 4, 4, 5];
  // arr.reduce((acc, cur) => {
  //   console.log(acc, cur, idx, ars);
  //   return acc + cur;
  // }, 0);
  // const max = arr.reduce((acc, cur, idx, ars) => {
  //   const max = acc > cur ? acc : cur;
  //   return max;
  // }, arr[0]);
  // console.log(max)
  // const min = arr.reduce((acc, cur) => {
  //   const min = acc < cur ? acc : cur
  //   return min;
  // }, arr[0]);
  // const min = arr.reduce((acc, cur) => {
  //   const min = acc < cur ? acc : cur
  //   return min;
  // }, arr[0]);

  // const uniqueNumbs = nums.reduce((acc, cur) => {
  //   acc.includes(cur) ? acc : acc.push(cur)
  //   return acc
  // }, [])

  // const ages = arr2.reduce((acc, cur) => {
  //   const ages = acc + cur.age;
  //   return ages
  // }, 0)
  // const groupedNames = arr2.reduce<Record<number, string[]>>((acc, cur) => {
  //   (acc[cur.age] = acc[cur.age] || []).push(cur.name)
  //   return acc
  // }, {});
  // console.log(groupedNames)

  // call,apply,bind
  interface Person {
    name: string;
    age: number;
  }

  const person: Person = {
    name: "John",
    age: 30
  };
  function greet(this: Person, district: string) {
    console.log(`Hello, my name is ${this.name} and I am ${this.age} years old. My Home district is ${district}.`);
  }
  // call
  greet.call(person, "Dhaka");
  // apply
  greet.apply(person, ["Rajshahi"]);
  // bind
  const boundGreet = greet.bind(person, "Khulna")
  boundGreet();
  return (
    <>

    </>
  );
};
export default TestJs;