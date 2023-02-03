import UIKit

func calorieCalculator(with calories: String) -> Int {
    var maxCalories:[Int] = []
    var elfCalories = 0
    let maxElves = 3
    
    // Iterate over the text input directly
    calories.enumerateLines { (line, _) in
        if(line.isEmpty) {
            // Check if current value should be tracked
            if(maxCalories.count == 0 || elfCalories > maxCalories[0]) {
                // Calculate position to insert new value in
                maxCalories.insert(elfCalories, at: maxCalories.reduce(0) {
                    elfCalories > $1 ? $0 + 1 : $0
                })
                
                // Control array length
                if(maxCalories.count > maxElves) {
                    maxCalories.remove(at: 0)
                }
            }
            elfCalories = 0
        }
        else {
            elfCalories += Int(line)!
        }
    }
    
    return maxCalories.reduce(0) {$0 + $1}
}

let fileURL = Bundle.main.url(forResource: "input", withExtension: "txt")
let content = try String(contentsOf: fileURL!, encoding: String.Encoding.utf8)

print(calorieCalculator(with: content))
