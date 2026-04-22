import {describe, it, expect, beforeEach} from "vitest";
import { InMemoryOrgsRepository } from "../repositories/in-memory/in-memory-orgs-repository.ts";
import { AuthenticateOrgUseCase } from "./authenticate.orgs.ts";
import { CreateOrgUseCase } from './create-org.ts';
import { InvalidCredentialsError } from "./errors/invalid-credentials-error.ts";

describe("AuthenticateOrgUseCase", () => {
    let orgsRepository: InMemoryOrgsRepository;
    let sut: AuthenticateOrgUseCase;

    beforeEach(() => {
    orgsRepository = new InMemoryOrgsRepository();
    sut = new AuthenticateOrgUseCase(orgsRepository);
  });

        it("should be able to authenticate an org", async () => {

        const createOrgUseCase = new CreateOrgUseCase(orgsRepository);
        await createOrgUseCase.execute({
            name: "Happy Org",
            email: "happyorg@email.com",
            password_hash: "123456",
            whatsapp: "1199999999",
            address: "Happy Dog St.",
            number: "100",
            city: "Dog City",
            uf: "TC",
            latitude: -23.68698429708608,
            longitude: -46.70378601250786,
            })

        const { org } = await sut.execute({
            email: "happyorg@email.com",
            password: "123456",
        });     
        
        expect(org).toHaveProperty("id");
        expect(org.email).toBe("happyorg@email.com");   
        expect(org.password_hash).not.toBe("123456");
    });

        it("should not be able to authenticate with wrong email", async () => {            
            await expect(() => sut.execute({
                email: "happyorg2@email.com",
                password: "123456",
            })).rejects.toThrow(InvalidCredentialsError);
    });

        it("should not be able to authenticate with wrong password", async () => {
        const createOrgUseCase = new CreateOrgUseCase(orgsRepository);
        await createOrgUseCase.execute({
            name: "Happy Org",
            email: "happyorg@email.com",
            password_hash: "123456",
            whatsapp: "1199999999",
            address: "Happy Dog St.",
            number: "100",
            city: "Dog City",
            uf: "TC",
            latitude: -23.68698429708608,
            longitude: -46.70378601250786,
        });

        await expect(() => sut.execute({
            email: "happyorg@email.com",
            password: "wrongpassword",
        })).rejects.toThrow(InvalidCredentialsError);
    });
});