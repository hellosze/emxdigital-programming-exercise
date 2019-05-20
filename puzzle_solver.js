function puzzleSolver(puzzle){
    //Parse puzzle question
    puzzle_lines = puzzle.split(" ");

    //Re-create puzzle question format
    array = new Array();
    array.push([" ","A","B","C","D"]);
    array.push(puzzle_lines[1].split(""));
    array.push(puzzle_lines[2].split(""));
    array.push(puzzle_lines[3].split(""));
    array.push(puzzle_lines[4].split(""));

    //A=A,B=B,C=C,D=D
    array[1][1] = "=";
    array[2][2] = "=";
    array[3][3] = "=";
    array[4][4] = "=";

facts = Array();
for(var i = 1; i <= 4; i++){
    for(var j = 1; j <= 4; j++){
	if(i == j){ continue; }
	arrayValue = array[i][j];
	if(arrayValue != "-" && arrayValue == "<"){
	    facts.push(i + " < " + j);
	}
	if(arrayValue != "-" && arrayValue == ">"){
	    facts.push(j + " < " + i);
	}
    }
}

a = facts[0];
b = facts[1];
c = facts[2];

var merge = function(a,b,c){
        if(a[a.length-1] == b[0]){
                return a.slice(0,a.length) + b.slice(1,b.length);
        }
        else if(b[b.length-1] == a[0]){
                return b.slice(0,b.length) + a.slice(1,a.length);
        }
        else if(a[a.length-1] == c[0]){
                return a.slice(0,a.length) + c.slice(1,c.length);
        }
        else if(c[c.length-1] == a[0]){
            return c.slice(0,c.length) + a.slice(1,a.length);
        }
        else {
                return a;
        }
}

while(a.length < 13)
    {
	a = merge(a,b,c) || merge(a,c,b) || merge(b,c,a) || merge(b,a,c) || merge(c,a,b) || merge(c,b,a);
    }

sort_order = a.split(" < ");


//Fill in all entries of puzzle table with < or >
array[sort_order[0]][sort_order[1]] = "<";
array[sort_order[0]][sort_order[2]] = "<";
array[sort_order[0]][sort_order[3]] = "<";

array[sort_order[1]][sort_order[2]] = "<";
array[sort_order[1]][sort_order[3]] = "<";
array[sort_order[1]][sort_order[0]] = ">";

array[sort_order[2]][sort_order[3]] = "<";
array[sort_order[2]][sort_order[0]] = ">";
array[sort_order[2]][sort_order[1]] = ">";

array[sort_order[3]][sort_order[0]] = ">";
array[sort_order[3]][sort_order[1]] = ">";
array[sort_order[3]][sort_order[2]] = ">";


    puzzleResults = Array();
    puzzleResults.push(array[0].join(""));
    puzzleResults.push(array[1].join(""));
    puzzleResults.push(array[2].join(""));
    puzzleResults.push(array[3].join(""));
    puzzleResults.push(array[4].join(""));
    return puzzleResults;
}
module.exports = puzzleSolver;

