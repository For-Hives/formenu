export function checkIfActivated(dish) {
	// Check if dish or ingredient is activated. If not, return false.
	if (!dish || dish.activated === null || dish.activated === false) return false

	// Check if available_date_start and available_date_end are present and are valid dates, also check if current date is within these dates.
	// If available_date_start & available_date_end are null, return true.
	// If they are not null but current date is not between these dates, return false.
	const today = new Date()
	const start = new Date(dish.available_date_start)
	const end = new Date(dish.available_date_end)

	if (dish.available_date_start !== null && dish.available_date_end !== null) {
		if (!(today >= start && today <= end)) return false
	}

	// Check activation status and date range for each ingredient of the dish, if any.
	if (dish.ingredients) {
		for (const element of dish.ingredients) {
			if (!checkIfActivated(element)) return false
		}
	}

	// Additional check for subdishes if they exist
	if (dish.dishes) {
		for (const subdish of dish.dishes) {
			if (!checkIfActivated(subdish)) return false
		}
	}

	// If all checks pass, return true
	return true
}
