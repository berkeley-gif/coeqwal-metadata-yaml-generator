-- CreateTable
CREATE TABLE "Dependency" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL DEFAULT '',

    CONSTRAINT "Dependency_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "YamlConfigAssumption" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL DEFAULT '',
    "kindId" TEXT NOT NULL,
    "source" TEXT NOT NULL DEFAULT '',
    "source_access_date" TIMESTAMP(3) NOT NULL DEFAULT '1970-01-01 00:00:00 +00:00',
    "version" TEXT NOT NULL DEFAULT '',
    "description" TEXT NOT NULL DEFAULT '',
    "file" TEXT NOT NULL DEFAULT '',

    CONSTRAINT "YamlConfigAssumption_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "AssumptionKind" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL DEFAULT '',

    CONSTRAINT "AssumptionKind_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "_YamlConfigToYamlConfigAssumption" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "_DependencyToYamlConfig" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "_YamlConfigToYamlConfigAssumption_AB_unique" ON "_YamlConfigToYamlConfigAssumption"("A", "B");

-- CreateIndex
CREATE INDEX "_YamlConfigToYamlConfigAssumption_B_index" ON "_YamlConfigToYamlConfigAssumption"("B");

-- CreateIndex
CREATE UNIQUE INDEX "_DependencyToYamlConfig_AB_unique" ON "_DependencyToYamlConfig"("A", "B");

-- CreateIndex
CREATE INDEX "_DependencyToYamlConfig_B_index" ON "_DependencyToYamlConfig"("B");

-- AddForeignKey
ALTER TABLE "YamlConfigAssumption" ADD CONSTRAINT "YamlConfigAssumption_kindId_fkey" FOREIGN KEY ("kindId") REFERENCES "AssumptionKind"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_YamlConfigToYamlConfigAssumption" ADD CONSTRAINT "_YamlConfigToYamlConfigAssumption_A_fkey" FOREIGN KEY ("A") REFERENCES "YamlConfig"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_YamlConfigToYamlConfigAssumption" ADD CONSTRAINT "_YamlConfigToYamlConfigAssumption_B_fkey" FOREIGN KEY ("B") REFERENCES "YamlConfigAssumption"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_DependencyToYamlConfig" ADD CONSTRAINT "_DependencyToYamlConfig_A_fkey" FOREIGN KEY ("A") REFERENCES "Dependency"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_DependencyToYamlConfig" ADD CONSTRAINT "_DependencyToYamlConfig_B_fkey" FOREIGN KEY ("B") REFERENCES "YamlConfig"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- Insert some dependencies
INSERT INTO "Dependency" ("id", "name") VALUES ('1', 'WRIMS 2, release 2024-01-29');

-- Insert some assumption kinds
INSERT INTO "AssumptionKind" ("id", "name") VALUES ('1', 'land_use');
INSERT INTO "AssumptionKind" ("id", "name") VALUES ('2', 'slr');
INSERT INTO "AssumptionKind" ("id", "name") VALUES ('3', 'gwmodel');