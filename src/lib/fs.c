// include the standar input/output library for C
#include <stdio.h>
#include <stdbool.h>
#include <stdlib.h>
#include <sys/stat.h>
#include <unistd.h>

// Define a fuunction calle "lg" that takes a string as an argument
int lg(const char *message)
{
    // Print the recived string argument to console.
    printf("%s\n", message);
    return 0;
}

// The File System

void freeString(char *str)
{
    free(str);
}

// Create a function that checks if a file exists or not

int exists(char *filename)
{
    char *file_name = filename;

    FILE *file = fopen(file_name, "r");

    if (file != NULL)
    {
        fclose(file);
        return true;
    }

    return false;
}

// Create a function that open a file
char *readFile(char *filename)
{
    FILE *file = fopen(filename, "r");

    if (file == NULL)
    {
        return NULL;
    }

    fseek(file, 0, SEEK_END);
    long file_size = ftell(file);
    rewind(file);

    char *buffer = malloc(file_size + 1);
    size_t read_size = fread(buffer, 1, file_size, file);
    buffer[read_size] = '\0';

    fclose(file);

    return buffer;
}

// Create a function that open a file
// char* readFile(char* filename) {
//   FILE* file;
//   file = fopen(filename, "rb"); // "rb" for binary reading

//   if (file == NULL) {
//     perror("Error opening file");
//     return NULL;
//   }

//   struct stat file_info;
//   stat(filename, &file_info);

//   size_t size_file = file_info.st_size;

//   char* buffer = (char*)malloc(sizeof(char) * (size_file + 1)); // +1 for null-terminator

//   if (buffer == NULL) {
//     perror("Error allocating memory for buffer");
//     fclose(file);
//     return NULL;
//   }

//   fread(buffer, 1, size_file, file);
//   buffer[size_file] = '\0'; // Null-terminate the string

//   // Process the buffer to remove non-printable characters
//   for (size_t i = 0; i < size_file; i++) {
//     if (buffer[i] < ' ' && buffer[i] != '\t' && buffer[i] != '\n' && buffer[i] != '\r') {
//       buffer[i] = ' '; // Replace non-printable characters with spaces
//     }
//   }

//   fclose(file);

//   return buffer;
// }


// Create a function that creates a file and can store content
bool writeFile(char *filename, char *content)
{
    char *file_name = filename;

    FILE *file = fopen(file_name, "w");

    if (file == NULL)
    {
        return false;
    }

    if (content != NULL && content[0] != '\0')
    {
        fprintf(file, "%s", content);
    }

    fclose(file);

    return true;
}

// Create a function that deletes a file.
bool removeFile(char *filename)
{
    // char *file_name = filename;
    // if (remove(file_name) == 0)
    // {
        // return true;
    // }
    // else
    // {
        // return false;
    // }
    return remove(filename) == 0;
}

// int main() {
//     writeFile("./example.json", "this is a random text");
//     printf("%s\n", openFile("example.json"));
//     return 0;
// }