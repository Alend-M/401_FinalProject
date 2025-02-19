# This file is used to create methods to fetch data from the database in supabase

import supabase 


def getAllUserPastBuilds(user_id: int) -> list:
    """
    Retrieves all past PC builds based on the user ID

    Parameters
    ----------
    user_id : int
        The user ID whose past builds are being fetched.

    Returns
    -------
    list: JSON
        A list of JSON objects containing the user's past PC builds
        >>>

    Examples
    --------
    >>> getAllUserPastBuilds(1)
    [
        {
            "build_id": 1,
            "cpu": "Intel Core i7-9700K",
            "gpu": "Nvidia RTX 3070",
            ...
        },
        {
            "build_id": 2,
            "cpu": "AMD Ryzen 5 5600X",
            "gpu": "Nvidia RTX 3060",
            ...
        }
    ]
    """
    # TODO: Implement the actual database query to fetch builds
    # This is a placeholder that should be replaced with actual implementation
    return []










