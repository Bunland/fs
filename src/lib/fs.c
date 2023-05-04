// include the standar input/output library for C
#include <stdio.h>
#include <stdbool.h>
#include <stdlib.h>

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
char *openFile(char *filename)
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