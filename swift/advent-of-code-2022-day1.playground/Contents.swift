import UIKit

func calorieCalculator(with calories: String) -> Int {
    // Split the multi-line string into a 2D array, separated by line breaks
    var max = 0
    let elfArray = calories.split(separator: "\n\n")
    
    // Execute a reduce on each sub-array, tracking the maximum as we go
    for elf in elfArray {
        let elfTotal = elf.split(separator: "\n").reduce(0) { $0 + Int($1)! }
        
        if (elfTotal > max) {
            max = elfTotal
        }
    }
    
    return max
}

let fileURL = Bundle.main.url(forResource: "input", withExtension: "txt")
let content = try String(contentsOf: fileURL!, encoding: String.Encoding.utf8)

print(calorieCalculator(with: content))
