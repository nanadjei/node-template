# Commands

This part of the application has a CLI feature where you can create your controllers, models, factories, seeders, migrations, etc by running some commands.

Below are commands to create the files stated above;

Controllers sits in the ./controllers directory. To create one;

```shell
npm run make controller <NameOfController>
```

Models sit in the ./models directory. To create one;

```shell
npm run make model <NameOfModel>
```

Models sit in the ./database/factory directory. To create one;

```shell
npm run make factory <NameOfFactory>
```

Models sit in the ./database/migrations directory. To create one;

```shell
npm run make factory <create_model(s)_table>
```

Models sit in the ./database/seeder directory. To create one;

```shell
npm run make factory <NameOfSeeder>
```

You can also run your seeds by running;

```shell
npm run seed
```
