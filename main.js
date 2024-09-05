// Returns a random DNA base
const returnRandBase = () => {
  const dnaBases = ["A", "T", "C", "G"];
  return dnaBases[Math.floor(Math.random() * 4)];
};

// Returns a random single stand of DNA containing 15 bases
const mockUpStrand = () => {
  const newStrand = [];
  for (let i = 0; i < 15; i++) {
    newStrand.push(returnRandBase());
  }
  return newStrand;
};

const specimenCollection = [];

// Creates unique specimen number.
function uniqueNum() {
  // Firstly generates a random number.
  let randomNum = Math.floor(Math.random() * 1001);
  // Then iterates through the specimen collection to check if number already exists as specimenNum value.
  while (
    specimenCollection.find((obj) => obj.specimenNum === randomNum) !==
    undefined
  ) {
    randomNum = Math.floor(Math.random() * 1001);
  }
  return randomNum;
}

function pAequorFactory(number = uniqueNum(), strand = mockUpStrand()) {
  const specimenSample = {
    specimenNum: number,
    dna: strand,
    mutate() {
      const randomiser = Math.floor(Math.random() * 15);
      let newBase = returnRandBase();

      do {
        newBase = returnRandBase();
      } while (this.dna[randomiser === newBase]);

      return (this.dna[randomiser] = newBase);
    },
    compareDNA(checkSample) {
      let counter = 0;

      console.log(checkSample.dna);
      console.log(this.dna);

      for (let i = 0; i < 15; i++) {
        if (this.dna[i] === checkSample.dna[i]) {
          counter++;
        }
      }
      const similarityPercentage = (counter / 15) * 100 + "%";
      console.log(
        `Specimen ${checkSample.specimenNum} and specimen ${this.specimenNum} have ${similarityPercentage} DNA in common.`
      );
    },
    willLikelySurvive(dna = this.dna) {
      let counter = 0;

      for (let i = 0; i < dna.length; i++) {
        if (dna[i] === "C" || dna[i] === "G") {
          counter++;
        }
      }

      if ((counter / dna.length) * 100 >= 60) {
        return true;
      } else {
        return false;
      }
    },
  };

  specimenCollection.push(specimenSample);

  return specimenSample;
}

const robustSpecimenCollection = [];

while (robustSpecimenCollection.length < 30) {
  let draftSpecimen = pAequorFactory();

  if (draftSpecimen.willLikelySurvive() === true) {
    robustSpecimenCollection.push(draftSpecimen);
  }
}

robustSpecimenCollection.forEach((specimen) => console.log(specimen));
