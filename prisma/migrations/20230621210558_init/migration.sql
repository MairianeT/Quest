-- CreateTable
CREATE TABLE "User" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Station" (
    "id" SERIAL NOT NULL,
    "markerName" TEXT NOT NULL,
    "markerPath" TEXT NOT NULL,
    "text" TEXT NOT NULL,

    CONSTRAINT "Station_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Animation" (
    "id" SERIAL NOT NULL,
    "coordinates" INTEGER[],
    "animation" TEXT NOT NULL,

    CONSTRAINT "Animation_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Results" (
    "id" SERIAL NOT NULL,
    "userId" INTEGER NOT NULL,
    "time" INTEGER NOT NULL,

    CONSTRAINT "Results_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Results" ADD CONSTRAINT "Results_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
