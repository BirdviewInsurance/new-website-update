import axios from "axios";

// Types
export interface AttachmentFile {
    url: string;
    name: string;
    key: string;
    type: string;
    size: number;
}

export interface ApiErrorResponse {
    success: boolean;
    message: string;
    error?: string;
    statusCode: number;
    data: any;
}

// Get API URL from environment variable or use default
const API_URL = process.env.NEXT_PUBLIC_API_URL || process.env.API_URL || "";

// Get auth headers function
const getAuthHeaders = (): Record<string, string> => {
    // Add your authentication logic here
    // For example, if using tokens:
    // const token = localStorage.getItem('token');
    // return token ? { Authorization: `Bearer ${token}` } : {};
    return {};
};

export const uploadDocument = async (
    file: File,
    fileName?: string,
    folderName: string = "requisitions"
): Promise<AttachmentFile> => {
    try {
        const formData = new FormData();
        formData.append('file', file);
        formData.append('file_name', fileName || file.name);
        formData.append('folder_name', folderName);

        const response = await axios.post<{
            url: string;
            name: string;
            key: string;
            type?: string;
            size: number;
        }>(
            `${API_URL}/api/aws/s3/general/document-upload`,
            formData,
            {
                headers: {
                    'Content-Type': 'multipart/form-data',
                    ...getAuthHeaders(),
                },
            }
        );

        return {
            url: response.data.url,
            name: response.data.name,
            key: response.data.key,
            type: response.data.type || "application/octet-stream",
            size: response.data.size,
        };
    } catch (error: unknown) {
        // Check if it's an axios error with response
        if (
            error &&
            typeof error === 'object' &&
            'response' in error
        ) {
            const axiosError = error as { response?: { data?: unknown } };
            if (axiosError.response?.data) {
                throw axiosError.response.data as ApiErrorResponse;
            }
        }

        throw {
            success: false,
            message: 'Failed to upload document',
            error: error instanceof Error ? error.message : 'Unknown error',
            statusCode: 500,
            data: null
        } as ApiErrorResponse;
    }
};