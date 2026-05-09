 return res.status(400).json({
            message: "Internal server error",
            job,
            success: true
        });