import UIKit

func calorieCalculator(with calories: String) -> Int {
    // Split the multi-line string into a 2D array, separated by line breaks
    var maxCalories = 0
    var elfCalories = 0
    
    calories.enumerateLines { (line, _) in
        if(line.isEmpty) {
            if(elfCalories > maxCalories) {
                maxCalories = elfCalories
            }
            elfCalories = 0
        }
        else {
            elfCalories += Int(line)!
        }
    }
    
    return maxCalories
}

let fileURL = Bundle.main.url(forResource: "input", withExtension: "txt")
let content = try String(contentsOf: fileURL!, encoding: String.Encoding.utf8)

print(calorieCalculator(with: content))
