""" 
    This file is made for response of every error existed. 
    In the future, as the development going, there will be more success and error response that need to be handled.
    Then this file will come in handy and can be added in the future. 
    For example success response for inserting and updating data into database, error for not getting access etc.
"""

def E001():
    return {
        "error_schema": {
        "error_code": "E001",
            "error_message": {
                "indonesian": "Terjadi Kesalahan!",
                "english": "Error occured."
            }
        }       

    }

def E002():
    return{
        "error_schema": {
        "error_code": "E002",
            "error_message": {
                "indonesian": "Terjadi kesalahan pada request yang dikirim.",
                "english": "Error occured on sending request."
            }
        }  
    }

def E003():
    return {
        "error_schema": {
            "error_code": "E003",
            "error_message": {
                "indonesian": "Id tidak ditemukan.",
                "english": "Id not found."
            }
        }
    }

def S001(data):
    return {
        "error_schema": {
            "error_code": "S001",
            "error_message": {
                "indonesian": "Berhasil!",
                "english": "Success!"
            }
        },
        "output_schema": data
    }

def S002():
    return {
        "error_schema": {
            "error_code": "E003",
            "error_message": {
                "indonesian": "Data tidak ditemukan.",
                "english": "Data not found."
            }
        }
    }


