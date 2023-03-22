/**
 *
 * @param {Function} fn
 * @returns
 */
module.exports = fn => {
	return async (req, res, next) => {
		try {
			await fn(req, res, next);
		} catch (error) {
			console.error(error);
			return res.status(error?.code ?? 500).json({
				message: error?.message ?? "Something Went Wrong",
				success: false,
			});
		}
	};
};
